# Mynt

## 開発準備
` docker-compose build `

<!-- ` docker-compose run --rm front sh -c "yarn" ` -->

` docker-compose run --rm api sh -c "rails db:create" `

` docker-compose run --rm api sh -c "rails db:migrate" `

` docker-compose run --rm api sh -c "rails db:seed" `

` docker-compose up `

` docker-compose down `