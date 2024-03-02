/** POM - Page Object Model - Объектная модель страницы,
 * представляет собой паттерн проектирования, который изолирует
 * интерфейс web-страницы, код тестов и DOM приложения.
 *
 *   Если конкретнее то в объектной модели страницы каждая веб-страница приложения
 *   представлена как класс или экземпляр класса. Каждый класс/экземпляр будет содержать в
 *   значениях своих полей,
 *   элементы веб-страницы. Используя эти элементы, тестировщики могут выполнять
 *   в коде теста операции на тестируемом веб-сайте.
 *
 * Достоинства этого паттерна:
 *
 * Разделение кода тестов и описания страниц
 * И как следствие:
 * Уменьшение дублирования
 * Более читабельные тесты и т.д.
 *
 *
 * Page Object — это паттерн проектирования.
 *
 * Все паттерны проектирования преследуют одну и ту же цель:
 * они пытаются изолировать код, который часто меняется,
 * от кода, который меняется по-другому или не меняется вообще
 *
 * Межстраничные шаги UI-тестов НЕ являются частью объектов страницы и не должны там существовать,
 * им месо либо в коде теста либо на худой конец в акторе.
 *
 * Декларативный и императивный подходы к програмированию
 *
 * Declarative:
 * LoginPage.logInAs(“test user”, “test-password”);
 *
 * Imperative:
 * LoginPage.setUserName(“test user”);
 * LoginPage.setPassword(“test-password”)
 * LoginPage.clickSubmit();
 *
 * Декларативный говорит ЧТО сделать.
 * А императивный КАК сделать.
 *
 * Для большей инкапсуляции и меньшего шума в тестах рекумендуется
 * предоставлять методы страничных объектов во вне декларативным способом.
 *
 * Актор или агрегатор - Actor/Aggregator.
 * Акторы - это фундаментальные единицы вычислений, реализующие обработку,
 * хранение своего состояния и коммуникацию между друг другом.
 * Одиночных акторов не бывает, они существуют в системах акторов.
 *
 * В ряде языков Актор представлен как встроенный ссылочный тип данных.
 * В JS этого типа среди встроенных в язык нет.
 *
 * Бывают одни и те же действия,
 * которые используются на многих страницах (например авторизация и выбор какого-то товара). И Актор
 * объединяет действия между объектами страницы, чтобы представить эти общие
 * агрегированные действия на страницах в виде многократно используемых фрагментов.
 * Они обеспечивают интерфейс более высокого уровня для тестов.
 * Таким образом, каждому тесту не нужно заново реализовывать эту
 * последовательность действий, он просто использует интерфейс, предоставляемый актором.
 **
 * Акторы не должны использовать базовую библиотеку пользовательского интерфейса
 * (selenium, playwright и т.д.), как это делают объекты страниц,
 * они используют объекты страниц только для управления поведением
 * пользовательского интерфейса.
 *
 */
class ShopperActor {
    logonAndSelectItem() {
        LoginPage.logInAs(“test user”, “test-password”);
        LandingPage.selectCurrentItem(“test-item”);
        DetailsPage.addValidItem();
    }
}

/** Статические методы, и методы экземпляров цепочки вызовов Page Objects
 *
 * Есть два подхода к реализации Page Object.
 *
 * Подход №1. Через классы.
 * Каждый Page Object - это класс со своими статическими методами.
 * И просто в тесте инициализуют его экземпляр.
 *
 * Подход №2. Через методы экземпляры классов, которые возвращают этот экземпляр.
 *  подход заключается в реализации объектов страниц как методов экземпляра,
 *  которые возвращают экземпляр объекта страницы,
 *  соответствующий тому месту, где браузер должен находиться после этого взаимодействия.
 *
 *
*/
new DetailsPage()
    .selectSize(‘XL’)
.selectQuantity(1)
    .selectColor(“white”)
.selectReoccuringPurchase(false)
    .addToCart();
.checkOut();

/**
 * Два подхода в расположении assertions
 *
 * Подход №1
 * Assertion-ы должны распологаться в тестах, и никогда в страничных объектах.
 *
 * Подход №2
 * Этот подход заключается в том, чтобы встроить утверждения в объекты страницы,
 * но сделать их очевидными при чтении интерфейса объекта страницы.
 * Вы никогда не должны прятать функциональные assertion-ы внутри шагов таким образом,
 * чтобы скрыть то, что они проверяют.
 */

New ItemDetailsPage()
    .addtoCart(item)
    .checkout()
    .assertCartIsEmpty();

/**
 *
 * Существует другой тип assertion-ов, который, на наш взгляд, может существовать в объектах страницы:
 * утверждения,
 * которые не являются функциональными утверждениями,
 * а просто проверяют, что текущее состояние браузера соответствует ожидаемому.
 * Например при создании нового экземпляра класса POM внутри страничного объекта проверялось
 * действительно ли браузер на этой странице приложения.
 */

/**
 * Page Component - POM для компонента страницы. Обычно это делают для тех компонентов,
 * которые переиспользуются на куче страниц.
 *
 * Есть два подхода к дизайну тестов с компонентами страниц.
 *
 * Подход №1
 * Из POM переиспользуемых компонентов формировать POM страниц.
 *
 * Подход №2
 * предпочитают использовать компоненты страниц не иначе, чем объекты страниц,
 * вызывая их непосредственно из тестов.
 *
 * Для лучшей масштабируемости лучше следовать подходу №2
 */

SearchResultsPage.FilterComponent.setStarRating(5);

/**
 * Page Objects и наследование
 *
 * Должны ли классы объектов страницы наследоваться от общего класса страницы?
 * Если да, то что входит в этот базовый класс и почему?
 *
 * Эммм да можно.
 *
 * Но мы приведем примеры когда это перебор:
 * 1) Использовать наследование чтобы передать доступы к вспомогательным методам,
 * которые являются кастомными комбинациями методов библиотеки тестового фреймворка.
 *
 * 2) Наследование для одной и той же страницы в разных локалях
 *
 * 3) BasePageObject в God Object. Эта монструозная махина содержит все общие
 * методжы которые бы в акторы, и также хелперы assertions, и хелперы запросов к API бековскому.
 */


/**
 * Что должно входить в BeforeEach и BeforeAll? Любая настройка, к
 * оторая не является функциональным шагом в тесте — то,
 * что, если бы присутствовало в самом тесте, загромождало бы его и снижало читабельность.
 *
 * То есть никакую авторизацию туда сувать не надо.
 */

/**
 * Нахрен централизованные локаторы.
 * Каждый объект страницы будет содержать множество локаторов для соответствующих
 * элементов на этой странице. Видя все локаторы на всех страницах,
 * возникает соблазн собрать эти локаторы в некий централизованный
 * класс Locators, и ссылается на него в каждом Page Object.
 */

/**
 * Одним из аспектов страничных объектов, который влияет на связанность
 * между тестами и страницами, является тип и количество аргументов,
 * передаваемых между тестами (или акторами) и Page Objects.
 * Часто мы сталкиваемся с ситуациями, когда необходимо передать
 * большое количество данных от теста к объекту страницы.
 * Передаем ли мы их в виде списка из 10 переменных?
 * Или мы создадим один объект и передадим его?
 */

/**
 * Альтернатива POM паттерн ScreenPlay.
 *
 */
