import { Component } from 'react';
import './App.css';
import { Builder, until, By } from 'selenium-webdriver';

export class App extends Component<any, { html: string }> {
  constructor(props: any) {
    super(props);
    this.state = { html: '' }
  }
  async getHtml() {
    this.setState({
      html: await overwriteIt({ cssForLoad: "*", url: "https://www.npmjs.com/package/selenium-webdriver" })
    })
  }
  render() {
    return (
      <div className="App" >
        <a onClick={() => { this.getHtml() }}>Click for trigger getHtml()</a>

        this.state.html = {this.state.html}
      </div>
    );
  }
}

async function overwriteIt(web: { url: string, cssForLoad: string }) {
  let driver = await new Builder().forBrowser("firefox").build();
  await driver.get(web.url)
  await driver.wait(until.elementLocated(By.css(web.cssForLoad)));
  const html = await driver.findElement(By.css("html")).getAttribute('outerHTML');
  await driver.quit();
  return await html;
}
