package pe.roffus.org.service;

import pe.roffus.org.model.Plantilla;

import java.util.List;

public interface PlantillaService {

    Plantilla getPlantilla(int id);
    List<Plantilla> listPlantillas();
}