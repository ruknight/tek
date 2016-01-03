package com.amadeusg.tektek;

import java.util.ArrayList;
import java.util.List;

public class Objects extends ArrayList<Objects.Content>{
	public class Content{
		public String id;
		public String title;
		public String placename;
		public String description;
		public String tel;
		public String address;
		public List tag;
		public List videolist;
		public String category;
		public String comment;
		public List officehours;
		public List transportation;
	}
}
