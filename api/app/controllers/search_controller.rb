class SearchController < ApplicationController
  def index
    mentaId = MentaTag.select(:id, :menta_id).where(tag_id: params[:tag_id])
    
    users = []
    mentaId.each do |val|
      users.push(Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: val.menta_id))
    end
    
    render json: {users: users}
  end
end
