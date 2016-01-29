rails new factory_girl_clone_demo  
bundle  
添加 Gemfile  
rails g model guitar description:string year:string strings:integer lefty:boolean  
rake db:migrate db:test:prepare
***  
rails c test  
guitar = FactoryGirl.create(:guitar)  
    guitar = FactoryGirl.build(:guitar)  
    guitar.new_record?  
    guitar.save  
     attrs = FactoryGirl.attributes_for(:guitar)  
***
$ rails g model store_location address:string  
rails g migration AddStoreLocationIdToGuitars store_location_id:integer  
rake db:migrate db:test:prepare
  
***
rails g migration AddInventoryCodeToGuitars inventory_code:string  
rake db:migrate db:test:prepare  









  