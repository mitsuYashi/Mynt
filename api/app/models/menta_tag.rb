class MentaTag < ApplicationRecord
    belongs_to :mentum, foreign_key: "uuid"
    belongs_to :tags, foreign_key: "id"
end
