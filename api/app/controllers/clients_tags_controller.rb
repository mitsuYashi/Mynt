class ClientsTagsController < ApplicationController
  def index
      client_tag = Client_tag.where(params[:client_id])
      render json: client_tag
  end

  def create
      if client_tag = Client_tag.where(client_id: create_client_tag_param[:client_id], tag_id: create_client_tag_param[:tag_id])
      else
          client_tag = Client_tag.create(create_client_tag_param)
      end
  end

  def update
      if client_tag = Client_tag.where(client_id: create_client_tag_param[:client_id], tag_id: create_client_tag_param[:tag_id])
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
      param.require(:client_tags).permit(:client_id, :tag_id)
  end 
end
