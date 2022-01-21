class UsersController < ApplicationController
    def index
        unless user = Mentum.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uuid])
            user = Client.joins(:user).find_by(user_id: params[:uuid])
        end
        render json: user
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
