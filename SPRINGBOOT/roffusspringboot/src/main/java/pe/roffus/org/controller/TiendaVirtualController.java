package pe.roffus.org.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pe.roffus.org.model.TiendaVirtual;
import pe.roffus.org.service.TiendaVirtualService;

import java.util.List;

@RestController
@RequestMapping("/tiendaVirtual")
public class TiendaVirtualController {
    TiendaVirtualService tiendaVirtualService;

    @Autowired
    public TiendaVirtualController(TiendaVirtualService tiendaVirtualService) {
        this.tiendaVirtualService=tiendaVirtualService;
    }

    @RequestMapping
    List<TiendaVirtual> listTiendaVirtuals(){       return tiendaVirtualService.listAll();    }

    @RequestMapping(path="/{id}",method = RequestMethod.GET)
    TiendaVirtual getTiendaVirtual(@PathVariable int id){
        return tiendaVirtualService.getById(id);
    }

    @PostMapping
    TiendaVirtual create(@RequestBody TiendaVirtual tiendaVirtual){
        return (tiendaVirtualService.insert(tiendaVirtual));
    }

    @PutMapping
    TiendaVirtual update(@RequestBody TiendaVirtual tiendaVirtual){ return tiendaVirtualService.update(tiendaVirtual); }

    @RequestMapping(path="/{id}",method = RequestMethod.DELETE)
    Boolean delete(@PathVariable int id){
        return tiendaVirtualService.delete(id);
    }

}
