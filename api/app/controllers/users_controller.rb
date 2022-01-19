class UsersController < ApplicationController
    def index
        if user = User.eager_load(:mentum).eager_load(:client)
            render json: user
        end
    end

    def create
        if user = User.find_by(uuid: params[:uuid]).nil?
            user = User.create(uuid: params[:uuid], name: params[:name], mail: params[:mail])
        end
    end

    private
    
    def create_user_param
        params.require(:user).permit(:uuid, :name, :mail)
    end

end
