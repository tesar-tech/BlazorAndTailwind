# Dropdown Menu without any external library

## Alternatives

- [Tailwind-elements dropdown](https://tailwind-elements.com/docs/standard/components/dropdown/)
  - js script is necessary to have functional dropdown
  - uses own css classes (tailwind-elements plugin)
- A lot of other Tailwind component libraries... [Flowbite](https://flowbite.com/docs/components/dropdowns/#), [TailwindUI](https://tailwindui.com/components/application-ui/elements/dropdowns),..
  - All require some sort of js library.
- [Dropdown menu without js](https://stackoverflow.com/questions/10468554/dropdown-menu-without-javascript) (SO question)
  - Old, but may be inspirational
  - Works with `onhover`, also with touch, but the issue with not closing the menu when button is pressed (touched) the second time.
- [BlazorContextMenu](https://github.com/stavroskasidis/BlazorContextMenu)
  - This may be the way to go!
  - Supports complex scenarios. For exaple sub-items.
  - Another dependecy in your project.
    - Necessary to import js a css file.
    - Css is customizable.
- [Using customized checkbox](https://css-tricks.com/the-checkbox-hack/)
  - This also may be viable solution
  - I didn't test it, it feels much more hackier than current solution. 

## Pure CSS (Tailwind) dropdown

Decent solution for simple dropdown exist. The magic is in `focus-within` css pseudoselector, which can be easily used with tailwind (or pure css if you want):

```html
<div class="group relative inline-block p-3 ml-7">
  <button type="button" class="border-neutral-600 border px-1 rounded-md">...</button>

  <div class="absolute left-0 top-10 flex min-w-max flex-col rounded-md border border-neutral-500 bg-neutral-100 px-2 py-1 
              invisible group-focus-within:visible group-active:visible">
    <div class="cursor-pointer hover:underline">Do amazing stuff</div>
    <div class="cursor-pointer hover:underline"> Go back</div>
  </div>
</div>
```

[Live demo](https://play.tailwindcss.com/xSihfwdQuZ).

### How does that work? 

- The container has class `group`. Using this, we can affect other elements inside that div.
- Second line of classes of the menu has `invisible group-focus-within:visible group-active:visible`
  - it is invisible unless the focus is within element where the class `group` is set.
  - `group-active:visible` is necessary for items to be actually clickable (??)
- Position is set to relative for outier div. For inner one (the menu) is set to absolute, so menu will always appear under the button.
- When you click the button, outer div got focused, thus menu gains visibility.
  - When you click somewhere else, focus is lost and menu will dissapear.

### What's the problem here?

- The only issue I have with this simple approach is clicking the button for the second time.
- I would like the menu to be closed when opened and clicked.
- This is the reason why some C# code is necessary.

## Blazor and simple dropdown

- To ensure the menu is closed, when clicking the button for the second time we have to add some C# code
- I came up with this:

```razor
<div class="group relative inline-block p-3 ml-7"
   @onfocusout="()=> alreadyClicked=false">
  <button type="button" class="border-neutral-600 border px-1 rounded-md"
  @onclick="@(()=>{ if(alreadyClicked==true) alreadyClicked=isVisible=false;else alreadyClicked=isVisible=true;})"
  >...</button>

  <div class="absolute left-0 top-10 flex min-w-max flex-col rounded-md border border-neutral-500 bg-neutral-100 px-2 py-1 
              invisible  @(isVisible?" group-focus-within:visible group-active:visible":"")">
    <div class="cursor-pointer hover:underline">Do amazing stuff</div>
    <div class="cursor-pointer hover:underline"> Go back</div>
  </div>
</div>

@code
{
    private bool isVisible;
    private bool alreadyClicked;
}
```

- Two boolean fields: `isVisible` and `alreadyClicked`.
- `@onclick` button event:
  - When clicked for the **first** time, visibility is set to true, same as the `alreadyClicked` flag.
  - When clicked for the **second** time, visibility is set to false and the `alreadyClicked` flag is reset.
- `isVisible` is used as second condition for the `group-focus-within:visible group-active:visible` classes.
- When outer continer looses focus, `alreadyClicked` is set to false to ensure setting visibility to true when clicking next time on button.
- It is necessary to have both `isVisible` and `alreadyClicked`.
- This should be easily extendable 


Working demo. Source code: