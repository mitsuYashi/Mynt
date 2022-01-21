class User < ApplicationRecord
    belongs_to :client, optional: true, foreign_key: "uuid"
    belongs_to :mentum, optional: true, foreign_key: "uuid"
end
