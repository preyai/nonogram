
export function initNonogram(element: HTMLDivElement) {
    let width = 10;
    let height = 15;
    let vertical: number[][] = [[2, 2, 2], [1, 1, 1]];
    let horizontal: number[][] = [[2, 2], [1, 1, 1]];

    const matrix: (boolean | undefined)[][] = new Array(height).fill(null).map(() => new Array(width));

    const getCellClass = (x?: number, y?: number, interactive: boolean = false) => {
        const classes: string[] = ['cell']

        if (interactive)
            classes.push('interactive')

        if (x && x % 5 === 0)
            classes.push('border-x')

        if (y && y % 5 === 0)
            classes.push('border-y')

        if (x !== undefined && y !== undefined && matrix[x][y])
            classes.push('fill')

        if (x !== undefined && y !== undefined && matrix[x][y] === false)
            classes.push('none')

        return classes.join(' ')
    }

    const getNumber = (a?: number[], i?: number) => {
        if (a === undefined || i === undefined)
            return '';

        return a[i] || '';
    }

    const clickHandler1 = (e: Event) => {
        const element = e.target as HTMLDivElement
        const x: number = Number(element.getAttribute('data-x'))
        const y: number = Number(element.getAttribute('data-y'))

        matrix[x][y] = matrix[x][y] ? undefined : true

        render()
    }

    const clickHandler2 = (e: Event) => {
        e.preventDefault()
        const element = e.target as HTMLDivElement
        const x: number = Number(element.getAttribute('data-x'))
        const y: number = Number(element.getAttribute('data-y'))

        matrix[x][y] = matrix[x][y] === false ? undefined : false

        render()
    }

    const render = () => {

        const horizontalMax = [...horizontal].sort((a, b) => b.length - a.length)[0].length;
        const verticalMax = [...vertical].sort((a, b) => b.length - a.length)[0].length;

        let h = `<div class='nonogram'>`;

        h += `<div class="horizontal" style='width:${width * 20}px'>`;
        for (let y = 0; y < horizontalMax; y++) {
            for (let x = 0; x < width; x++) {
                h += `<div class='${getCellClass(x)}'>${getNumber(horizontal[x], horizontalMax - y - 1)}</div>`;
            }
        }
        h += `</div>`;

        h += `<div class="vertical" style='width:${verticalMax * 20}px'>`;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < verticalMax; x++) {
                h += `<div class='${getCellClass(undefined, y)}'>${getNumber(vertical[y], verticalMax - x - 1)}</div>`;
            }
        }
        h += `</div>`;


        h += `<div class="field" style='width:${width * 20}px'>`;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                h += `<div class='${getCellClass(x, y, true)}' data-x='${x}' data-y='${y}' ></div>`;
            }
        }
        h += `</div>`;
        h += `</div>`;

        element.innerHTML = h;


        element.querySelectorAll('.cell').forEach(item => {
            item.addEventListener('click', clickHandler1)
            item.addEventListener('contextmenu', clickHandler2)
        })
    }

    render()
}