/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.amadeusg.tektek;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
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
 * @author daiki
 */
@Path("contents")
public class ContentsResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CategoryResource
     */
    public ContentsResource() {
    }

    /**
     * Retrieves representation of an instance of
     * com.amadeusg.tektek.CategoryResource
     *
     * @return an instance of java.lang.String
     */

    @GET
    @Path("/")
    @Produces("application/json;charset=utf-8")
public String getContents(@QueryParam("id") String id) {
        //TODO return proper representation object
        String trimmed_id = id.trim();
        Objects json = Contents.getJson();
        Gson gson = new Gson();
        List<Objects.Content> list = new ArrayList<>();
        if(trimmed_id.equals("") || trimmed_id.equals(null) || trimmed_id.length() == 0){
            return "";
        }
        for (Objects.Content content : json) {
            if(content.id.matches(id)){
                list.add(content);
                break;
            }
        }
        String result = gson.toJson(list);
        return result;
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
