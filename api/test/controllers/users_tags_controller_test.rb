require 'test_helper'

class UsersTagsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get users_tags_index_url
    assert_response :success
  end

  test "should get create" do
    get users_tags_create_url
    assert_response :success
  end

  test "should get show" do
    get users_tags_show_url
    assert_response :success
  end

  test "should get destroy" do
    get users_tags_destroy_url
    assert_response :success
  end

end
