import assert from 'node:assert/strict'
import { after, before, beforeEach, describe, test } from 'node:test'
import { Builder, By, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'

const BASE_URL = process.env.JOBTRACK_BASE_URL ?? 'http://127.0.0.1:5173'
const WAIT_MS = 10_000
const STORAGE_KEY = 'jobtrack-applications'

const fixtures = [
  {
    id: 'selenium-acme',
    company: 'Acme Technologies',
    role: 'Frontend Developer',
    jobUrl: 'https://example.com/acme',
    appliedDate: '2026-10-20',
    status: 'Applied',
    notes: 'Seeded by Selenium',
  },
  {
    id: 'selenium-globex',
    company: 'Globex Corporation',
    role: 'QA Engineer',
    jobUrl: '',
    appliedDate: '2026-10-21',
    status: 'Interview',
    notes: 'Seeded by Selenium',
  },
]

let driver

async function visible(locator) {
  return driver.wait(async () => {
    const elements = await driver.findElements(locator)
    for (const element of elements) {
      if (await element.isDisplayed()) return element
    }
    return false
  }, WAIT_MS, `No visible element found for ${locator}`)
}

async function setTestData(applications = []) {
  await driver.get(BASE_URL)
  await driver.wait(until.titleContains('JobTrack'), WAIT_MS)
  await driver.executeScript(
    'window.localStorage.setItem(arguments[0], JSON.stringify(arguments[1]));',
    STORAGE_KEY,
    applications,
  )
  await driver.navigate().refresh()
  await driver.wait(until.elementLocated(By.xpath("//h1[normalize-space()='Dashboard']")), WAIT_MS)
}

async function openApplications(applications = fixtures) {
  await setTestData(applications)
  await (await visible(By.xpath("//nav//button[normalize-space()='Applications']"))).click()
  await driver.wait(until.elementLocated(By.id('application-search')), WAIT_MS)
}

async function waitForNotice(message) {
  const notice = await visible(By.css('[role="status"]'))
  await driver.wait(until.elementTextContains(notice, message), WAIT_MS)
}

async function option(select, label) {
  return select.findElement(By.xpath(`./option[normalize-space()=${JSON.stringify(label)}]`))
}

describe('JobTrack Selenium UI flows', () => {
  before(async () => {
    const options = new chrome.Options()
      .addArguments('--headless=new', '--window-size=1440,1000', '--disable-dev-shm-usage')

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
  })

  after(async () => {
    if (driver) await driver.quit()
  })

  beforeEach(async () => {
    await setTestData([])
  })

  test('opens the application', async () => {
    assert.match(await driver.getTitle(), /JobTrack/)
    assert.equal(await (await visible(By.xpath("//h1[normalize-space()='Dashboard']"))).getText(), 'Dashboard')
  })

  test('adds an application', async () => {
    await openApplications([])
    await (await visible(By.xpath("//button[normalize-space()='Add application']"))).click()
    await (await visible(By.id('company'))).sendKeys('Selenium Systems')
    await driver.findElement(By.id('role')).sendKeys('Automation Engineer')
    await driver.findElement(By.xpath("//button[normalize-space()='Add application' and @type='submit']")).click()

    await waitForNotice('Application added.')
    assert.equal(await (await visible(By.xpath("//td[normalize-space()='Selenium Systems']"))).getText(), 'Selenium Systems')
  })

  test('searches by company', async () => {
    await openApplications()
    await driver.findElement(By.id('application-search')).sendKeys('Acme')
    await visible(By.xpath("//td[normalize-space()='Acme Technologies']"))
    await driver.wait(async () => (await driver.findElements(By.xpath("//td[normalize-space()='Globex Corporation']"))).length === 0, WAIT_MS)
  })

  test('filters by status', async () => {
    await openApplications()
    const filter = await driver.findElement(By.id('application-status-filter'))
    await (await option(filter, 'Interview')).click()
    await visible(By.xpath("//td[normalize-space()='Globex Corporation']"))
    await driver.wait(async () => (await driver.findElements(By.xpath("//td[normalize-space()='Acme Technologies']"))).length === 0, WAIT_MS)
  })

  test('updates an application status', async () => {
    await openApplications()
    const status = await visible(By.css('select[aria-label="Update status for Acme Technologies"]'))
    await (await option(status, 'Offer')).click()
    await waitForNotice('Status updated.')
    await driver.wait(async () => (await status.getAttribute('value')) === 'Offer', WAIT_MS)
  })

  test('edits an application', async () => {
    await openApplications()
    await (await visible(By.css('button[aria-label="Edit Acme Technologies"]'))).click()
    const company = await visible(By.id('company'))
    await company.clear()
    await company.sendKeys('Acme Labs')
    await driver.findElement(By.xpath("//button[normalize-space()='Save changes']")).click()

    await waitForNotice('Application updated.')
    assert.equal(await (await visible(By.xpath("//td[normalize-space()='Acme Labs']"))).getText(), 'Acme Labs')
  })

  test('deletes an application', async () => {
    await openApplications()
    await (await visible(By.css('button[aria-label="Delete Acme Technologies"]'))).click()
    await visible(By.xpath("//h2[normalize-space()='Delete application?']"))
    await driver.findElement(By.xpath("//button[normalize-space()='Delete application']")).click()

    await waitForNotice('Application deleted.')
    await driver.wait(async () => (await driver.findElements(By.xpath("//td[normalize-space()='Acme Technologies']"))).length === 0, WAIT_MS)
    assert.equal((await driver.findElements(By.xpath("//td[normalize-space()='Globex Corporation']"))).length, 1)
  })
})
