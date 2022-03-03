class MentaTag < ApplicationRecord
    has_many :tag, foreign_key: "tag_id"
    has_many :client, foreign_key: "menta_id"
end
