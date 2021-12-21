# Blazor and Tailwind CSS

Blazor is great and Tailwind CSS makes styling bearable.

In version 3 of Tailwind CSS, the setting for Blazor app got much easier, because a brand new standalone tailwind CLI has been released. **No need for npm to be installed**.

These notes may be useful for anyone who would like to test the Blazor&Tailwind connection.

(Add your own experience in the list below (or an issue))

## Quick guide (windows)

- [Download](https://github.com/tailwindlabs/tailwindcss/releases) `tailwindcss-windows-x64.exe`
- Rename file to `tw` (not necessary, but makes life easier)
  - or you can add the location to Path variable in windows (like I did)
- Open terminal in root of your project and: `./tw.exe init`, this creates `tailwind.config.js`
![tailwind init](media/2021-12-21-17-11-37.png)
- Inside the `tailwind.config.js` file insert this code below. It will watch for all HTML and razor files. Whenever a new tailwind class appears in them, tailwind CLI will re-generate your `app.min.css` file (more in next step)

    ```js
    module.exports = {
    content: [
        './**/*.html',
        './**/*.razor',
    ],
    theme: {
    extend: {
        
        },
        },
    plugins: [],
    }
    ```

- add tailwind directives to app.css. (place it after any imports)

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

- Now run tailwind watch with:
`./tw -i .\wwwroot\css\app.css -o .\wwwroot\css\app.min.css --watch`
![tailwind watch](media/2021-12-21-17-13-32.png)
This takes your current CSS file (app.css), prepends its content to generated tailwind classes, and outputs `app.min.css` in the same folder.

- Now change the path in `index.html` (or `_Host.cshtml` for Blazor server) to use `app.min.css` instead of `app.css`. It will look like this:

    ```html
    <link href="css/app.min.css" rel="stylesheet" />
    ```

- Add some tailwind class to test the functionality. This will pang background with green color. On hover text color will change to amber and will get bigger.

  ``` html
    <h1 class="bg-green-500 hover:text-amber-300 text-lg hover:text-2xl">Hello, world!</h1>
  ```

    ![tailwind watch](media/res.gif)

## Few notes and tips

- For even quicker setting you can use CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- [Tailwind playground]( https://play.tailwindcss.com/) is a great place to create prototypes. It is fast (you see changes instantly), vscode based and allows you to save your work.
- tailwind build process is rather quick, but sometimes leaves a mess inside the CSS file. For example, it will keep all the classes that were previously used (but are not used anymore)
  - You can delete the `app.min.css` file at any time (it will generate it again).
  - You should use minified version in production: `./tw -i input.css -o output.css --minify`
- Tailwind and bootstrap have some clashing CSS classes (px-2 for example). If you need to keep both (I have to, because I am using a component library, which is based on bootstrap) you can use [prefix](https://tailwindcss.com/docs/configuration#prefix) for tailwind classes.
- There is currently no tailwind package in the chocolatey package manager. You can vote for it [here](https://github.com/tailwindlabs/tailwindcss/discussions/6650).
- There is [this](https://github.com/tailwindlabs/tailwindcss-intellisense) a good extension for vscode, which brings pleasant experience from tailwind playground to your desktop. For me ([and other folks](https://github.com/tailwindlabs/tailwindcss-intellisense/issues/448)) it doesn't work in v3.
- I had a bad experience with dotnet hot reload when CSS files are regenerated. It does weird things, like not updating (even after Ctrl+R), serving older versions, etc.. You can turn off hot reloading with: `dotnet watch --project . --no-hot-reload`. I am in the progress of finding a better solution. Anybody knows it already?