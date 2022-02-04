class UsersController < ApplicationController
    def index
        unless user = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: params[:uuid])
            user = Client.joins(:user).select(:name, :birth, :user_id).find_by(user_id: params[:uuid])
            profile = {
                user: user,
                userType: "client"
            }
        else
            profile = {
                user: user,
                userType: "menta"
            }
        end
        render json: profile
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
