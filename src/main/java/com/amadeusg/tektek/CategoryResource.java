/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.amadeusg.tektek;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;

/**
 * REST Web Service
 *
 * @author K
 */
@Path("category")
public class CategoryResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CategoryResource
     */
    public CategoryResource() {
    }

    @GET
    @Path("/")
    @Produces("application/json;charset=utf-8")
    public String CategoryJson(@QueryParam("q") String category) {
        String trimmed_category = category.trim();
        if (trimmed_category.equals("") || trimmed_category.equals(null) || trimmed_category.length() == 0) {
            return "";
        }
        Objects json = Contents.getJson();
        Gson gson = new Gson();
        List<Objects.Content> category_list = new ArrayList<>();
        for (Objects.Content content : json) {
            for (Object tag : content.tag) {
                if (tag.toString().matches(".*" + trimmed_category + ".*")) {
                    category_list.add(content);
                    break;
                }
            }
        }
        Collections.shuffle(category_list);
        if (category_list.size() >= 5) {
            return gson.toJson(category_list.subList(0, 5));
        } else {
            return gson.toJson(category_list);
        }
    }

    /**
     * PUT method for updating or creating an instance of CategoryResource
     *
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
