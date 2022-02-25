class MessagesController < ApplicationController
    def index
        contract = Contract.where(client_id: params[:uid_first], menta_id: params[:uid_second]).or(Contract.where(client_id: params[:uid_second], menta_id: params[:uid_first]))
        like = Like.where(client_id: params[:uid_first], menta_id: params[:uid_second]).or(Like.where(client_id: params[:uid_second], menta_id: params[:uid_first]))

        # contract = Contract.where()

        unless like === []
            unless user = Mentum.joins(:user).select(:user_id, :name, :profile, :birth, :url).find_by(user_id: params[:uid_first])
                user = Client.joins(:user).select(:user_id, :name, :birth).find_by(user_id: params[:uid_first])
                tag_id = ClientTag.select(:tag_id).where(client_id: params[:uid_first])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                myProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "client"
                }
            else
                tag_id = MentaTag.select(:tag_id).where(menta_id: params[:uid_first])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                myProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "menta"
                }
            end
            unless user = Mentum.joins(:user).select(:user_id, :name, :profile, :birth, :url).find_by(user_id: params[:uid_second])
                user = Client.joins(:user).select(:user_id, :name, :birth).find_by(user_id: params[:uid_second])
                tag_id = ClientTag.select(:tag_id).where(client_id: params[:uid_second])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                sendProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "client"
                }
            else
                tag_id = MentaTag.select(:tag_id).where(menta_id: params[:uid_second])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                sendProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "menta"
                }
            end
            render json: { myProfile: myProfile, sendProfile: sendProfile, isExist: true }
        end
        unless contract === []
            unless user = Mentum.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uid_first])
                user = Client.joins(:user).select(:name, :birth).find_by(user_id: params[:uid_first])
                tag_id = ClientTag.select(:tag_id).where(client_id: params[:uid_first])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                myProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "client"
                }
            else
                tag_id = MentaTag.select(:tag_id).where(menta_id: params[:uid_first])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                sendProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "menta"
                }
            end
            unless user = Mentum.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uid_second])
                user = Client.joins(:user).select(:name, :profile, :birth, :url).find_by(user_id: params[:uid_second])
                tag_id = ClientTag.select(:tag_id).where(client_id: params[:uid_second])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                myProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "client"
                }
            else
                tag_id = MentaTag.select(:tag_id).where(menta_id: params[:uid_second])
                tag_name = []
                tag_id.each do |val|
                    tag_name.push(Tag.find(val.tag_id))
                end
                sendProfile = {
                    tag: tag_name,
                    user: user,
                    userType: "menta"
                }
            end
            render json: { myProfile: myProfile, sendProfile: sendProfile, isExist: true }
        end
    end
end
