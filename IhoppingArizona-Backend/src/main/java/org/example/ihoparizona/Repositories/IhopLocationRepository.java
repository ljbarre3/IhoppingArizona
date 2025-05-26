package org.example.ihoparizona.Repositories;

import org.example.ihoparizona.Entities.IhopLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IhopLocationRepository extends JpaRepository<IhopLocation, Long> {
}
