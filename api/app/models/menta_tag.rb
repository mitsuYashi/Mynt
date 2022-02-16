class MentaTag < ApplicationRecord
    has_many :mentum, dependent: :destroy
    has_many :tag, dependent: :destroy
end
