class UsersController < ApplicationController
    def index
        user = Menta.find_by(uid: params[uid])
        render json: user
    end

    def create
        if user = User.find_by(uid: create_user_param[:uid])
        else
            user = User.create(create_user_param, status: 1)
        end
        render json: user
    end

    private
    
    def create_user_param
        params.require(:user).permit(:uid, :mail, :name)
    end

end
