src/

    app/                // contains global styles,  types, providers (entry point)

    processes/          // many pages combined like quizz

    pages/              builded from widgets and features (has to be тонкая, никакой бизнес-логики)
                        все компоненты находятся в <Layout/>

    widgets/            // combines entities with features

    features/           // имееют какуету логику, выполняют какоето задание

    entities/           // так как и в backend мы имеем класс пользователя (UserService) который отвечает за все
                        // функции, сущности. Без функционала

    shared/             // не имеют бизнес логики (на пример показ какойто информации в зависимости от чегото)
                        // reusable modules

Structure
Слой / слайс / сегмент
entities / userInfo / UI (ex.) or api

Сегменты
api
config
model
components or UI
