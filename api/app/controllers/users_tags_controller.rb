class UsersTagsController < ApplicationController
  def index
    user_tags = User_tags.all()
    render json: user_tags
  end

  def create
    if user_tag = User_tag.where(user_id: create_user_tag_param[:user_id], tag_id: create_user_tag_param[:tag_id])
    else
        user_tag = User_tag.create(create_user_tag_param)
    end
  end

  def show
    user_tags = User_tag.where(tag_id: params[:tag_id])
    render json: user_tags
  end

  def destroy
    user_tag.delete(params[:id])
  end

  private
  def create_user_tag_param
    param.require(:user_tag).permit(:tag_id)
  end
end
