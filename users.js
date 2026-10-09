class User {
    constructor(surname, name, age, education, purpose, date, time) {
        this.surname = surname;
        this.name = name;
        this.age = age;
        this.education = education;
        this.purpose = purpose;
        this.date = date;
        this.time = time;
    }
    getFullName() {
        return `${this.surname} ${this.name}`;
    }
    getDateTime() {
        return new Date(`${this.date}T${this.time}`);
    }
    isWorkingTime() {
        return this.time >= "09:00" && this.time < "17:00";
    }
    getGroup() {
        if (this.education === "вища" && this.isWorkingTime())
        {
            return "з вищою освітою у робочий час (09:00 до 17:00)";
        }

        if (this.education === "немає" && !this.isWorkingTime())
        {
            return "без освіти у неробочий час";
        }

        return "інші";
    }
}

class UserList {
    constructor(users) {
        this.users = users;
    }
    byMonth(month, moment) {
        return this.users.filter(u => u.date.startsWith(month) && u.getDateTime() <= moment);
    }
    youngest() {
        return this.users.reduce((min, u) => u.age < min.age ? u : min);
    }
    classify() {
        const groups = { "з вищою освітою у робочий час (09:00 до 17:00)": [], "без освіти у неробочий час": [], "інші": [] };
        this.users.forEach(u => groups[u.getGroup()].push(u));

        return groups;
    }
    sortByName() {
        return [...this.users].sort((a, b) => a.getFullName().localeCompare(b.getFullName(), "uk"));
    }
}

const users = new UserList([
    new User("Шевченко", "Олена", 34, "вища", "співпраця", "2026-03-03", "10:15"),
    new User("Ковальчук", "Андрій", 19, "немає", "наявність помилки", "2026-03-07", "21:40"),
    new User("Бондаренко", "Ірина", 45, "вища", "пропозиція", "2026-02-12", "14:05"),
    new User("Ігнатенко", "Максим", 17, "немає", "пропозиція", "2026-03-14", "07:30"),
    new User("Литвин", "Софія", 28, "професійна", "скарга на порушення права власності", "2026-03-18", "11:50"),
    new User("Єременко", "Дмитро", 52, "вища", "співпраця", "2026-04-02", "19:20"),
    new User("Ткачук", "Наталія", 23, "неповна", "наявність помилки", "2026-03-21", "16:45"),
    new User("Мельник", "Олег", 39, "повна", "скарга на порушення права власності", "2026-03-25", "09:00"),
    new User("Савчук", "Вікторія", 31, "вища", "пропозиція", "2026-03-10", "13:30"),
    new User("Гнатюк", "Роман", 22, "немає", "співпраця", "2026-01-28", "12:10")
]);

console.log("Користувачі, які звернулись у березні 2026 станом на 20.03.2026 12:00");

console.table(users.byMonth("2026-03", new Date("2026-03-20T12:00")).map(u => ({ "Користувач": u.getFullName(), "Дата": u.date, "Час": u.time })));

console.log("Користувач з мінімальним віком");

const young = users.youngest();

console.table([{ "Користувач": young.getFullName(), "Вік": young.age, "Освіта": young.education }]);

console.log("Поділ користувачів на класи");

const groups = users.classify();
const rows = [];

for (const group in groups) {
    groups[group].forEach(u => rows.push({ "Клас": group, "Користувач": u.getFullName(), "Освіта": u.education, "Час": u.time }));
}

console.table(rows);

console.log("Кількість користувачів у кожному класі");

console.table(Object.keys(groups).map(group => ({ "Клас": group, "Кількість": groups[group].length })));

console.log("Користувачі в алфавітному порядку");

console.table(users.sortByName().map(u => ({ "Користувач": u.getFullName(), "Мета зворотнього зв’язку": u.purpose })));