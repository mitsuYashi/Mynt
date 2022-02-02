class ClientTag < ApplicationRecord
    belongs_to :tag, foreign_key: "tag_id"
    belongs_to :client, foreign_key: "client_id"
end
