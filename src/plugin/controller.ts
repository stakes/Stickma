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
        const imageFrame = figma.createFrame();
        imageFrame.resizeWithoutConstraints(150 * s, 150 * s);
        imageFrame.fills = makeFillFromImageData(msg.data);
        imageFrame.x = anchorX;
        imageFrame.y = anchorY;

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
