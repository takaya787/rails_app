module ApplicationHelper
  #ページ毎に完全なタイトル
  def full_title(page_title = '')
    base_title = "住み心地.com"
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end
end
