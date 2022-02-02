class MessagesController < ApplicationController
    def index
        contract = Contract.where(client_id: params[:uid_first], menta_id: params[:uid_second]).or(Contract.where(client_id: params[:uid_second], menta_id: params[:uid_first]))
        like = Like.where(client_id: params[:uid_first], menta_id: params[:uid_second]).or(Like.where(client_id: params[:uid_second], menta_id: params[:uid_first]))

        # contract = Contract.where()

        unless like === []
            unless user = Mentum.joins(:user).select(:user_id, :name, :profile, :birth, :url).find_by(user_id: params[:uid_first])
                user = Client.joins(:user).select(:user_id, :name, :birth).find_by(user_id: params[:uid_first])
                myProfile = {
                    user: user,
                    userType: "client"
                }
            else
                myProfile = {
                    user: user,
                    userType: "menta"
                }
            end
            unless user = Mentum.joins(:user).select(:user_id, :name, :profile, :birth, :url).find_by(user_id: params[:uid_second])
                user = Client.joins(:user).select(:user_id, :name, :birth).find_by(user_id: params[:uid_second])
                sendProfile = {
                    user: user,
                    userType: "client"
                }
            else
                sendProfile = {
                    user: user,
                    userType: "menta"
                }
            end
            render json: { myProfile: myProfile, sendProfile: sendProfile, isExist: true }
        end
        unless contract === []
            unless user = Mentum.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uid_first])
                user = Client.joins(:user).select(:name, :birth).find_by(user_id: params[:uid_first])
                myProfile = {
                    user: user,
                    userType: "client"
                }
            else
                myProfile = {
                    user: user,
                    userType: "menta"
                }
            end
            unless user = Mentum.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uid_second])
                user = Client.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uid_second])
                sendProfile = {
                    user: user,
                    userType: "client"
                }
            else
                sendProfile = {
                    user: user,
                    userType: "menta"
                }
            end
            render json: { myProfile: myProfile, sendProfile: sendProfile, isExist: true }
        end
    end
end
