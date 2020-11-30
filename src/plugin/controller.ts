figma.showUI(__html__, {width: 300, height: 400});

figma.ui.onmessage = (msg) => {
    let anchorX = figma.viewport.center.x;
    let anchorY = figma.viewport.center.y;
    let zoom = figma.viewport.zoom;
    let s = 1 / zoom;
    let selection = figma.currentPage.selection[0];
    if (selection) {
        anchorX = selection.absoluteTransform[0][2] + selection.width;
        anchorY = selection.absoluteTransform[1][2];
    }

    if (msg.type === 'place-sticker') {
        // const stickerOpacity = true ? 0 : 1
        // const frame = figma.createFrame();
        // frame.x = anchorX - frame.width / 2;
        // frame.y = anchorY - frame.height / 2;
        // frame.horizontalPadding = frame.verticalPadding = 8;
        // frame.layoutMode = 'HORIZONTAL';
        // frame.primaryAxisSizingMode = 'AUTO';
        // frame.counterAxisSizingMode = 'AUTO';
        // frame.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}, opacity: stickerOpacity}];
        // frame.strokeAlign = 'INSIDE';
        // frame.strokeWeight = 1;
        // frame.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0.15}];
        // frame.effects = [bevelEffect, shadowEffect]

        const imageFrame = figma.createFrame();
        imageFrame.resizeWithoutConstraints(100 * s, 100 * s);
        imageFrame.fills = makeFillFromImageData(msg.data);
        imageFrame.x = anchorX - imageFrame.width / 2;
        imageFrame.y = anchorY - imageFrame.height / 2;

        // frame.appendChild(imageFrame);

        const group = figma.group([imageFrame], figma.currentPage);
        group.name = msg.title ? msg.title : 'Sticker';
        group.expanded = false;

        figma.currentPage.selection = [group];
    }

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
