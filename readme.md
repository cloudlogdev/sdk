# cloudlog - The console.log cloud solution

Use your own local browser console to debug the weirdest browser in the most remote locations.

## Quickstart

### Node.js/CommonJS

You can install this executable using npm:

```shell
npm i cloudlog
```

For sure, you also can use yarn:

```shell
yarn add cloudlog
```

Once installed, you need to initialize it exactly once at the top / root of your project. Use your personal credentials, you can obtain them by selecting **SDK CREDENTIALS** in the menu.

```javascript
import cloudlog from "cloudlog";
cloudlog.initialize(
  "user-00000000-1111-2222-3333-444444444444",
  "project-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  {}
);
```

### Hosted version

```html
<script
  src="https://sdk.cloudlog.dev/browser.js"
  data-user="user-00000000-1111-2222-3333-444444444444"
  data-project="project-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
></script>
```

Just put that snippet as very first &#x3C;script&#x3E; Tag in any site with some console.log debugging output and the output is streamed here.

## Usage

Once integrated, you can return to [ui.cloudlog.dev](https://ui.cloudlog.dev) and start receiving your logs.

![View Logs in the UI](https://www.cloudlog.dev/screens/streaming.png)

## Support

- For Bugs / Feedback on the SDK please create an issue.
- For general feedback to the service please write to: [support@cloudlog.dev](mailto:support@cloudlog.dev)

## License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
