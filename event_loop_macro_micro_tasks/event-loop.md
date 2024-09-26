Java script - это однопоточный язык с последовательным выполнением операций.
У него однопотосная среда выполнения и унего один колстек

1) Рендеринг (отрисовка страницы) никогда не происходит во время выполнения задачи движком. Не имеет значения, сколь долго выполняется задача. Изменения в DOM отрисовываются только после того, как задача выполнена.
2) Если задача выполняется очень долго, то браузер не может выполнять другие задачи, обрабатывать пользовательские события, поэтому спустя некоторое время браузер предлагает «убить» долго выполняющуюся задачу. Такое возможно, когда в скрипте много сложных вычислений или ошибка, ведущая к бесконечному циклу.

Сразу после каждой макрозадачи движок исполняет все задачи из очереди микрозадач перед тем, как выполнить следующую макрозадачу или отобразить изменения на странице, или сделать что-то ещёСразу после каждой макрозадачи движок исполняет все задачи из очереди микрозадач перед тем, как выполнить следующую макрозадачу или отобразить изменения на странице, или сделать что-то ещё
```angular2html
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

Какой здесь будет порядок?

code появляется первым, т.к. это обычный синхронный вызов.
promise появляется вторым, потому что .then проходит через очередь микрозадач и выполняется после текущего синхронного кода.
timeout появляется последним, потому что это макрозадача.

События пользовательского интерфейса и сетевые события в промежутках между микрозадачами не обрабатываются: микрозадачи исполняются непрерывно одна за другой.

Поэтому queueMicrotask можно использовать для асинхронного выполнения функции в том же состоянии окружения.
________

В большинстве своём браузеры рассматриваются как однопоточные приложения. 

1) навигация
1.1) DNS запрос - это запрос получения IP-адреса. 
Если вы недавно были на этой страице то в кеше мог сохранится IP-адрес и эта стадия пропускается
Главный прикол: у вас аналитика, шрифты всне на разных доменах - поздравляем DNS запрос будет идти для каждого
1.2) TCP handshake -  браузер начинает установку соединения к серверу с помощью рукопожатия
они обмениваются параметрами соединения
1.3) TLS-переговоры - выполняется только если https
2) Запрос html file
   В примере выше ответ значительно меньше, чем 14КБ; скрипты и стили, перечисленные в ответе, не будут запрошены, пока браузер не обработает ответ. Процесс обработки ответа - парсинг - мы обсудим отдельно.
3) TCP медленный старт
первая порция 14 килобайт вторая 28 - это для того чтобы все пакеты не ломанкулись когда ширина канала этого не позволяет
Контроль переполнения - на каждое получение пакетов браузер отвечает серверу подтверждение что мол получено - а если не ответил сервер заново отправит эти же пакеты
4) Парсинг
4.1) Построение дерева объектной модели документа
   DOM (Объектная модель документа) - это внутреннее представление разметки HTML. Браузер предоставляет доступ к манипуляции объектами этой модели через разные JavaScript API.
   Когда парсер находит неблокирующие ресурсы (например, изображения), браузер отправляет запрос на загрузку ресурсов, но сам продолжает обработку. Обработка может продолжаться когда обнаружена ссылка на CSS файл, но если обнаружен <script>, особенно если он без параметров async или defer - такой скрипт считается блокирующим и приостанавливает обработку HTML до завершения загрузки скрипта. Несмотря на то, что сканер предзагрузки (о нём ниже) браузера может находить и запрашивать такие скрипты заранее, сложные и объёмные скрипты всё ещё могут стать причиной заметных задержек загрузки страницы.
4.2)Сканер предзагрузки
   Построение дерева DOM занимает весь поток процесса. Так как это явно узкое место в производительности, был создан особый сканер предзагрузки. Он обрабатывает доступное содержимое документа и запрашивает высокоприоритетные ресурсы (CSS, JavaScript и шрифты). Благодаря этому сканеру нам не нужно ждать, пока парсер дойдёт до конкретного места, где вызывается ресурс. 
4.3) ПОСТРОЕНИЕ CssOm
4.4) Компиляция JS
формируется абстрактное синтаксическое дерево - спасибо сканеру предзагрузки - и 
и компиляция js
4.5) Построение дерева доступности. Пока модель AOM не построена, содержимое страницы недоступно для голосовых помощников и считывателей экрана.
5) Рендеринг
   Этапы рендеринга включают в себя стилизацию, компоновку (layout), отрисовку (paint) и, в некоторых случаях, композицию (composition). 
5.1) Третий шаг в критическом пути рендеринга - это комбинирование DOM и CSSOM в дерево рендеринга.
   Элементы, которые не должны быть показаны, например, <head>, а так же их дети или любые элементы с display:none, такие как script { display: none; }, не будут включены в дерево рендера, так как они не должны быть отрисованы. Узлы с правилом visibility: hidden включены в дерево рендера, так как они всё равно занимают своё место. Так как мы не указали никаких специальных правил для перезаписи стилей агента по умолчанию, узел script в примере выше также не будет включён в дерево рендера.
5.2) Компоновка (Layout)
   На этом шаге вычисляется геометрия каждого узла, то есть ширина, высота, положение элементов. Reflow (перекомпоновка) - это любой последующий процесс определения размеров и позиции для любой из частей целого документа.
5.3)Отрисовка (Paint)
5.4) Композиция слои
6) Интерактивность - тут может запускать js которому велели запускаться после onload
и если уж он большой - то сорян можно страницу видетььии смотреть на нее но интерактивности не будет пока js не выполнится

Обновления, запланированные внутри useLayoutEffect, будут полностью применены синхронно перед тем, как браузер получит шанс осуществить отрисовку.