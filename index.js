var navigation_progress = document.getElementById('navigation_progress')

const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
    element: navigation_progress,
    engine: engine,
    options: {
        width: window.innerWidth,
        //width: navigation_progress.clientWidth,
        height: window.innerHeight * 1.4,
        wireframes: false,
        //background: 'white'
        background: 'transparent'
    }
});

const fixedPoint = Bodies.circle(400, 100, 10, { isStatic: true, render: { fillStyle: '#000' } });

const rope = [];

for (let i = 0; i < 7; i++) {
    const x = 400;
    const y = 100 + 25 / 7 * (i + 1);

    const segment = Bodies.rectangle(x, y, 5, 5, {
        render: {
            fillStyle: '#9e7b4f'
        }
    });

    World.add(world, segment);

    if (i > 0) {
        const prevSegment = rope[i - 1];

        const segmentConstraint = Constraint.create({
            bodyA: prevSegment,
            bodyB: segment,
            length: 10,
            stiffness: 0.1,
            damping: 0.1,
            render: {
                lineWidth: 4,
                strokeStyle: '#9e7b4f',
            }
        });

        World.add(world, segmentConstraint);
    }

    if (i === 0) {
        const fixedConstraint = Constraint.create({
            pointA: { x: navigation_progress.clientWidth * 0.98, y: 0 },
            bodyB: segment,
            length: 25 / 7,
            stiffness: 0.07,
            damping: 0.1,
            render: {
                lineWidth: 4,
                strokeStyle: '#9e7b4f'
            }
        });
        World.add(world, fixedConstraint);
    }
    rope.push(segment);
}

const bellSVG = `
<svg width="560" height="575" viewBox="0 0 560 575" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M264.055 453.081C260.028 508.316 260.991 538.004 272.055 565.269H289.501C298.869 526.227 300.309 500.865 297.055 453.081C331.363 408.386 329.988 389.186 279.555 368.581C226.193 390.975 232.236 411.592 264.055 453.081Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M225.555 78.5812C220.97 36.1747 227.101 18.0152 272.055 7.58119C321.272 5.99666 329.859 27.3889 334.055 78.5812C467.792 119.597 501.903 171.823 518.555 296.581C544.553 304.128 552.968 312.152 551.555 336.581C546.824 351.661 539.417 358.611 518.555 368.581C481.326 495.223 425.83 535.903 289.501 565.269C298.869 526.227 300.309 500.865 297.055 453.081C331.363 408.386 329.988 389.186 279.555 368.581C226.193 390.975 232.236 411.592 264.055 453.081C260.028 508.316 260.991 538.004 272.055 565.269H289.501C287.838 565.627 286.176 565.78 284.503 565.935L284.501 565.935C282.868 566.086 281.224 566.237 279.555 566.581C141.605 542.897 82.167 508.732 44.0548 368.581C25.6827 363.603 17.542 359.063 9.05473 346.081C4.25235 318.584 9.90439 307.665 35.5547 296.581C57.2943 182.629 84.0427 126.739 225.555 78.5812ZM279.555 72.5812C268.28 73.4665 259.595 74.2032 252.555 74.8898C252.096 45.1327 258.216 36.4606 279.555 34.0812C303.067 42.024 305.273 52.8233 304.354 74.8898C297.029 74.1226 289.263 73.4132 279.555 72.5812Z" fill="#FBCF5C"/>
<path d="M225.555 78.5812C220.97 36.1747 227.101 18.0152 272.055 7.58119C321.272 5.99666 329.859 27.3889 334.055 78.5812M225.555 78.5812C84.0427 126.739 57.2943 182.629 35.5547 296.581M225.555 78.5812C232.895 77.1482 240.186 76.0962 252.555 74.8898M334.055 78.5812C322.688 76.9866 313.894 75.8891 304.354 74.8898M334.055 78.5812C467.792 119.597 501.903 171.823 518.555 296.581M35.5547 296.581C9.90439 307.665 4.25235 318.584 9.05473 346.081C17.542 359.063 25.6827 363.603 44.0548 368.581M35.5547 296.581C218.751 256.971 324.345 255.807 518.555 296.581M252.555 74.8898C259.595 74.2032 268.28 73.4665 279.555 72.5812C289.263 73.4132 297.029 74.1226 304.354 74.8898M252.555 74.8898C252.096 45.1327 258.216 36.4606 279.555 34.0812C303.067 42.024 305.273 52.8233 304.354 74.8898M518.555 296.581C544.553 304.128 552.968 312.152 551.555 336.581C546.824 351.661 539.417 358.611 518.555 368.581M44.0548 368.581C82.167 508.732 141.605 542.897 279.555 566.581C281.224 566.237 282.868 566.086 284.501 565.935L284.503 565.935C286.176 565.78 287.838 565.627 289.501 565.269M44.0548 368.581C225.19 318.621 329.162 319.546 518.555 368.581M518.555 368.581C481.326 495.223 425.83 535.903 289.501 565.269M289.501 565.269C298.869 526.227 300.309 500.865 297.055 453.081C331.363 408.386 329.988 389.186 279.555 368.581C226.193 390.975 232.236 411.592 264.055 453.081C260.028 508.316 260.991 538.004 272.055 565.269H289.501Z" stroke="black" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const blob = new Blob([bellSVG], { type: 'image/svg+xml' });
const url = URL.createObjectURL(blob);

const bell = Bodies.circle(400, 100 + 4 * 25 / 7, 20, {
    render: {
        sprite: {
            texture: url,
            xScale: 0.1,
            yScale: 0.1
        }
    }
});

const bellConstraint = Constraint.create({
    bodyA: rope[6],
    bodyB: bell,
    pointB: { x: 0, y: -27 },
    length: 10,
    stiffness: 0.1,
    damping: 0.1,
    render: {
        lineWidth: 3,
        strokeStyle: '#9e7b4f'
    }
});

World.add(world, [bell, bellConstraint]);

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.1,
        render: { visible: false }
    }
});

World.add(world, mouseConstraint);
Render.run(render);
Engine.run(engine);

window.addEventListener('resize', () => {
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

window.onscroll = function() {
    navigation_progress.style.top = -(40-(((document.documentElement.scrollTop / window.innerHeight) * 100).toFixed(2)*40/(this.document.body.scrollHeight/window.innerHeight*100)).toFixed(2)) + "%"
};

var progress_control = document.getElementById('progress_control')
progress_control.addEventListener('mouseenter',function(){
    console.log(1)
    navigation_progress.classList.toggle('prevent_mouse')
    progress_control.classList.toggle('dissapear')
})

render.canvas.addEventListener('mouseup',function(){
    navigation_progress.classList.toggle('prevent_mouse')
    progress_control.classList.toggle('dissapear')
})
