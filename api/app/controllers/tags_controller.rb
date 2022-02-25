class TagsController < ApplicationController
  def index
    tag = Tag.all()
    if user = Mentum.find_by(user_id: params[:uuid])
      tag_id = MentaTag.select(:tag_id).where(menta_id: params[:uuid])
      tag_name = []
      tag_id.each do |val|
        tag_name.push(Tag.find(val.tag_id))
      end
    elsif user = Client.find_by(user_id: params[:uuid])
      tag_id = ClientTag.select(:tag_id).where(client_id: params[:uuid])
      tag_name = []
      tag_id.each do |val|
        tag_name.push(Tag.find(val.tag_id))
      end
    end
    render json: { tag: tag, myTags: tag_name }
  end

  def create
    if menta = Mentum.find_by(user_id: create_tags_param[:uuid])

      tags = MentaTag.where(menta_id: create_tags_param[:uuid])
      
      tags.each do |val|
        val.delete  
      end

      create_tags_param[:myTags].each do |tag|
        MentaTag.create(menta_id: create_tags_param[:uuid], tag_id: tag)
      end
      
      render json: {message: "更新しました"}

    elsif client = Client.find_by(user_id: create_tags_param[:uuid])
      tags = ClientTag.where(client_id: create_tags_param[:uuid])

      tags.each do |val|
        val.delete  
      end

      create_tags_param[:myTags].each do |tag|
        ClientTag.create(client_id: create_tags_param[:uuid], tag_id: tag)
      end
      
      render json: {message: "更新しました"}

    end
  end

  def destroy

  end

  private
  def create_tags_param
    params.require(:tags).permit(:uuid, myTags: [])
  end

end
