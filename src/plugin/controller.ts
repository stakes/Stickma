figma.showUI(__html__, {width: 300, height: 400});

figma.ui.onmessage = (msg) => {
    let anchorX = figma.viewport.center.x;
    let anchorY = figma.viewport.center.y;
    let zoom = figma.viewport.zoom;
    let s = 1 / zoom;

    const bevelEffect: Effect = {
        type: 'INNER_SHADOW',
        color: {r: 0, g: 0, b: 0, a: 1},
        offset: {x: -1 * s, y: -3 * s},
        radius: 0,
        visible: true,
        blendMode: 'SOFT_LIGHT',
    };
    // shadow effect style
    let shadowEffect: Effect /*Array<Effect>*/ = {
        type: 'DROP_SHADOW',
        color: {r: 0, g: 0, b: 0, a: 1},
        offset: {x: 0, y: 1 * s},
        radius: 3 * s,
        visible: true,
        blendMode: 'SOFT_LIGHT',
    };

    if (msg.type === 'place-sticker') {
        const frame = figma.createFrame();
        frame.x = anchorX - frame.width / 2;
        frame.y = anchorY - frame.height / 2;
        frame.horizontalPadding = frame.verticalPadding = 8;
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'AUTO';
        frame.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
        frame.strokeAlign = 'INSIDE';
        frame.strokeWeight = 1;
        frame.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0.15}];
        // frame.effects = [bevelEffect, shadowEffect]

        const imageFrame = figma.createFrame();
        imageFrame.resizeWithoutConstraints(200, 200);
        imageFrame.fills = makeFillFromImageData(msg.data);
        imageFrame.x = figma.viewport.center.x - imageFrame.width / 2;
        imageFrame.y = figma.viewport.center.y - imageFrame.height / 2;

        frame.appendChild(imageFrame);

        const group = figma.group([frame], figma.currentPage);
        group.name = 'Sticker';
        group.expanded = false;

        figma.currentPage.selection = [group];
    }

    // if (msg.type === 'create-rectangles') {
    //     const nodes = [];

    //     for (let i = 0; i < msg.count; i++) {
    //         const rect = figma.createRectangle();
    //         rect.x = i * 150;
    //         rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //         figma.currentPage.appendChild(rect);
    //         nodes.push(rect);
    //     }

    //     figma.currentPage.selection = nodes;
    //     figma.viewport.scrollAndZoomIntoView(nodes);

    //     // This is how figma responds back to the ui
    //     figma.ui.postMessage({
    //         type: 'create-rectangles',
    //         message: `Created ${msg.count} Rectangles`,
    //     });
    // }

    figma.closePlugin();
};

function makeFillFromImageData(data) {
    let imageHash = figma.createImage(data).hash;

    const newFill: Paint = {
        type: 'IMAGE',
        filters: {
            contrast: 0,
            exposure: 0,
            highlights: 0,
            saturation: 0,
            shadows: 0,
            temperature: 0,
            tint: 0,
        },
        imageHash,
        imageTransform: [
            [1, 0, 0],
            [0, 1, 0],
        ],
        opacity: 1,
        scaleMode: 'FIT',
        scalingFactor: 0.5,
        visible: true,
    };
    return [newFill];
}
