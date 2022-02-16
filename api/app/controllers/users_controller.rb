class UsersController < ApplicationController
    def index
        if user = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: params[:uuid])
            profile = {
                user: user,
                userType: "menta"
            }
        else
            user = Client.joins(:user).select(:name, :birth, :user_id).find_by(user_id: params[:uuid])
            profile = {
                user: user,
                userType: "client"
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
