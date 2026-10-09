const directions = [
    { id: 1, name: "Освіта", department: "Департамент освіти і науки", govLink: "Взаємодія з Міністерством освіти і науки України", readersDay1: 420, readersDay2: 380, term: 12 },
    { id: 2, name: "Соціальна підтримка", department: "Департамент соціального захисту населення", govLink: "Реалізація державних програм соціальної підтримки", readersDay1: 510, readersDay2: 470, term: 24 },
    { id: 3, name: "Охорона довкілля", department: "Департамент екології та природних ресурсів", govLink: "Співпраця з Державною екологічною інспекцією України", readersDay1: 230, readersDay2: 260, term: 36 },
    { id: 4, name: "Охорона здоров’я", department: "Департамент охорони здоров’я", govLink: "Взаємодія з Національною службою здоров’я України", readersDay1: 640, readersDay2: 590, term: 12 },
    { id: 5, name: "Культура", department: "Департамент культури та туризму", govLink: "Співпраця з Міністерством культури і стратегічних комунікацій України", readersDay1: 310, readersDay2: 290, term: 18 },
    { id: 6, name: "Адміністративні послуги", department: "Управління цифровізації та цифрових трансформацій", govLink: "Взаємодія з Міністерством цифрової трансформації України", readersDay1: 580, readersDay2: 610, term: 6 },
    { id: 7, name: "Професійна освіта", department: "Департамент освіти і науки", govLink: "Взаємодія з Міністерством освіти і науки України", readersDay1: 190, readersDay2: 210, term: 24 },
    { id: 8, name: "Підтримка внутрішньо переміщених осіб", department: "Департамент соціального захисту населення", govLink: "Взаємодія з Міністерством соціальної політики України", readersDay1: 450, readersDay2: 400, term: 12 },
    { id: 9, name: "Підтримка ветеранів", department: "Департамент соціального захисту населення", govLink: "Взаємодія з Міністерством у справах ветеранів України", readersDay1: 270, readersDay2: 300, term: 24 },
    { id: 10, name: "Туризм", department: "Департамент культури та туризму", govLink: "Співпраця з Державним агентством розвитку туризму України", readersDay1: 350, readersDay2: 330, term: 18 }
];

function unique(list) {
    return list.filter((item, i) => list.indexOf(item) === i);
}

function sortByTerm(list) {
    return [...list].sort((a, b) => a.term - b.term);
}

function averageReadersByTerm(list) {
    const terms = unique(list.map(d => d.term));

    return terms.map(term => {
        const group = list.filter(d => d.term === term);
        const sum = group.reduce((s, d) => s + d.readersDay1 + d.readersDay2, 0);

        return { term, average: Math.round(sum / group.length) };
    });
}

function maxReadersDay1(list) {
    return list.reduce((max, d) => d.readersDay1 > max.readersDay1 ? d : max);
}

function isComplete(direction) {
    const fields = ["id", "name", "department", "govLink", "readersDay1", "readersDay2", "term"];

    return fields.every(key => direction[key] !== undefined && direction[key] !== null && direction[key] !== "");
}

function addDirection(list, direction) {
    return isComplete(direction) ? [direction, ...list] : [...list, direction];
}

function projectDuration(list) {
    return list.reduce((sum, d, i) => sum + (i === 0 ? d.term : d.term * 1.1), 0);
}

console.log("Напрями, впорядковані за терміном реалізації");

const sorted = sortByTerm(directions);

console.table(sorted.map(d => ({ "Напрям": d.name, "Термін (міс)": d.term })));

console.log("Середня кількість читачів за дві доби для напрямів з однаковим терміном");

console.table(averageReadersByTerm(sorted).map(g => ({ "Термін (міс)": g.term, "Середня кількість читачів": g.average })));

console.log("Напрям з максимальною кількістю читачів за добу 1");

const max = maxReadersDay1(directions);

console.table([{ "Напрям": max.name, "Читачів за добу 1": max.readersDay1, "Відділ": max.department }]);

console.log("Додавання нового напряму");

const full = { id: 11, name: "Енергетика", department: "Департамент паливно-енергетичного комплексу", govLink: "Взаємодія з Міністерством енергетики України", readersDay1: 150, readersDay2: 170, term: 24 };
const partial = { id: 12, name: "Молодіжна політика", department: "Департамент освіти і науки", readersDay1: 90, readersDay2: 110, term: 12 };

console.table([full, partial].map(d => {
    const list = addDirection(directions, d);

    return { "Напрям": d.name, "Вся інфо": isComplete(d) ? "так" : "ні", "Позиція у списку": `${list.indexOf(d) + 1} з ${list.length}` };
}));

console.log("Тривалість реалізації напрямів відділом");

console.table(unique(directions.map(d => d.department)).map(dep => {
    const list = directions.filter(d => d.department === dep);

    return { "Відділ": dep, "Кількість напрямів": list.length, "Тривалість (міс)": Number(projectDuration(list).toFixed(1)) };
}));