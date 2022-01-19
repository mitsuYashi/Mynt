class ClientTag < ApplicationRecord
    belongs_to :tag, foreign_key: "id"
    belongs_to :client, foreign_key: "uuid"
end
