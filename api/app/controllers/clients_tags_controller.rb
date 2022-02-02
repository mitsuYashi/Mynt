class ClientsTagsController < ApplicationController
  def index
    client_tag = Client_tag.where(params[:user_id])
    render json: client_tags
  end

  def create
    if client_tag = Client_tag.where(user_id: create_client_tag_param[:user_id], tag_id: create_client_tag_param[:tag_id])
    else
        client_tag = Client_tag.create(create_client_tag_param)
    end
  end

  def show
    client_tags = Client_tag.where(tag_id: params[:tag_id])
    render json: client_tags
  end

  def destroy
    client_tag.delete(params[:id])
  end

  private
  def create_client_tag_param
    param.require(:client_tag).permit(:tag_id)
  end
end
