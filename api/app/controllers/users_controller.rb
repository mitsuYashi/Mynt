class UsersController < ApplicationController
    def index
        user = User.find_by(uuid: params[uuid])
        render json: user
    end

    def create
        if user = User.find_by(uuid: create_user_param[:uuid])
        else
            user = User.create(create_user_param)
        end
        render json: user
    end

    private
    
    def create_user_param
        params.require(:user).permit(:uuid, :mail, :name)
    end

end
