/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.amadeusg.tektek;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
 * @author K
 */
@Path("search")
public class SearchResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of SearchResource
     */
    public SearchResource() {
    }

    /**
     * Retrieves representation of an instance of
     * com.amadeusg.tektek.SearchResource
     *
     * @param word
     * @return an instance of java.lang.String
     */
    @Path("/")
    @GET
    @Produces("application/json;charset=utf-8")
    public String getResult(@QueryParam("word") String word) {

        String[] sWord = word.split("\\+");
        Objects json = Contents.getJson();
        Gson gson = new Gson();
        List<Objects.Content> list = new ArrayList<>();
        if (word.equals("") || word.equals(null) || word.length() == 0) {
            return "";
        }
        for (Objects.Content content : json) {
            for (int i = 0; i < sWord.length; i++) {
                if (content.address.matches(".*" + sWord[i] + ".*")
                        || content.officehours.contains(".*" + sWord[i] + ".*")
                        || content.tag.contains(".*" + sWord[i] + ".*")
                        || content.tel.matches(".*" + sWord[i] + ".*")
                        || content.transportation.contains(".*" + sWord[i] + ".*")
                        || content.category.matches(".*" + sWord[i] + ".*")
                        || content.comment.matches(".*" + sWord[i] + ".*")
                        || content.description.matches(".*" + sWord[i] + ".*")
                        || content.placename.matches(".*" + sWord[i] + ".*")
                        || content.title.matches(".*" + sWord[i] + ".*")) {
                    list.add(content);
                }
            }
        }
        String result = gson.toJson(list);
        return result;
    }

    /**
     * PUT method for updating or creating an instance of SearchResource
     *
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content
    ) {
    }
}
