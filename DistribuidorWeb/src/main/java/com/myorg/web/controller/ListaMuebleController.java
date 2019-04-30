package com.myorg.web.controller;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.primefaces.event.SelectEvent;

import com.myorg.business.MuebleBusiness;
import com.myorg.business.UsuarioBusiness;
import com.myorg.model.entity.Mueble;
import com.myorg.model.entity.Usuario;
import com.myorg.model.entity.ListaMuebles;
import com.myorg.util.Message;
import com.myorg.business.ListaMueblesBusiness;

@Named
@ViewScoped
public class ListaMuebleController implements Serializable{
     private static final long serialVersionUID = 1L;

    @Inject
    private UsuarioBusiness usuarioBusiness;

    @Inject
    private MuebleBusiness muebleBusiness;

    @Inject
    private ListaMueblesBusiness listaMuebleBusiness;

    private ListaMuebles listaMueble;
    private ListaMuebles listaMuebleSelec;
    private List<ListaMuebles> listaMuebles;

    private Usuario usuario;
    private List<Usuario> usuarios;

    private Mueble mueble;
    private List<Mueble> muebles;

    @PostConstruct
    public void init() {
        listaMueble = new ListaMuebles();
        listaMuebleSelec = new ListaMuebles();

        loadListaMuebles();
        loadMuebles();
        loadUsuarios();
    }

    public void loadMuebles() {
        try {
            this.muebles = muebleBusiness.list();
        } catch (Exception e) {
            Message.messageError("Error Mueble 2 :" + e.getMessage());
        }
    }

    public void loadUsuarios() {
        try {
            this.usuarios = usuarioBusiness.list();
        } catch (Exception e) {
            Message.messageError("Error Usuario 2 :" + e.getMessage());
        }
    }

    public void loadListaMuebles() {
        try {
            this.listaMuebles = listaMuebleBusiness.list();
        } catch (Exception e) {
            Message.messageError("Error ListaMuebles 2 :" + e.getMessage());
        }
    }

    public void saveListaMuebles() {
        try {
            if (listaMueble.getCodListaMueble()!= null) {

                Message.messageInfo("Registro actualizado exitosamente");
                listaMueble.setUsuario(usuario);
                listaMueble.setMueble(mueble);
                listaMuebleBusiness.update(listaMueble);
            } else {
                listaMueble.setUsuario(usuario);
                listaMueble.setMueble(mueble);
                listaMuebleBusiness.insert(listaMueble);
                Message.messageInfo("Registro guardado exitosamente");

            }
            loadListaMuebles();
            clearForm();
        } catch (Exception e) {
            Message.messageError("Error ListaMuebles :" + e.getStackTrace());
        }
    }

    public void editListaMuebles() {
        try {
            if (this.listaMuebleSelec != null) {
                this.listaMueble = listaMuebleSelec;
            } else {
                Message.messageInfo("Debe seleccionar un ListaMuebles");
            }
        } catch (Exception e) {
            Message.messageError("Error ListaMuebles :" + e.getMessage());
        }

    }

    public void deleteListaMuebles() {
        try {
            if (this.listaMuebleSelec != null) {
                listaMuebleBusiness.delete(listaMuebleSelec);
                loadListaMuebles();
                clearForm();

            } else {

            }
        } catch (Exception e) {

        }
    }

    public void selectListaMueble(SelectEvent e) {
        this.listaMuebleSelec = (ListaMuebles) e.getObject();
    }

    public void clearForm() {
        this.listaMueble = new ListaMuebles();
        this.listaMuebleSelec = null;
    }

    public ListaMuebles getListaMueble() {
        return listaMueble;
    }

    public void setListaMueble(ListaMuebles listaMueble) {
        this.listaMueble = listaMueble;
    }

    public ListaMuebles getListaMuebleSelec() {
        return listaMuebleSelec;
    }

    public void setListaMuebleSelec(ListaMuebles listaMuebleSelec) {
        this.listaMuebleSelec = listaMuebleSelec;
    }

    public List<ListaMuebles> getListaMuebles() {
        return listaMuebles;
    }

    public void setListaMuebles(List<ListaMuebles> listaMuebles) {
        this.listaMuebles = listaMuebles;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Mueble> getMuebles() {
        return muebles;
    }

    public void setMuebles(List<Mueble> muebles) {
        this.muebles = muebles;
    }

    public Mueble getMueble() {
        return mueble;
    }

    public void setMueble(Mueble mueble) {
        this.mueble = mueble;
    }


}
