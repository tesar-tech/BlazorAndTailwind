let resizeCallback;

export function initResizeListener  (dotNetObjectRef) {
    resizeCallback = function (e) {
        var width = e.target.visualViewport.width;
        var height = e.target.visualViewport.height;

        // Call the .NET instance method
        dotNetObjectRef.invokeMethodAsync('OnResize', width, height);
    };

    window.addEventListener('resize', resizeCallback);
    dotNetObjectRef.invokeMethodAsync('OnResize', window.visualViewport.width, window.visualViewport.height);

};

export function removeResizeListener() {
    window.removeEventListener('resize', resizeCallback);
};
