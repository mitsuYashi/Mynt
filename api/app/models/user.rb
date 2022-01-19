class User < ApplicationRecord
    has_one :client
    has_one :mentum
end
