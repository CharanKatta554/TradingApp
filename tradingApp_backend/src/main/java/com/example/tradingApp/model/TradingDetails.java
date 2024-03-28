package com.example.tradingApp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "trade_details")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class TradingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date tradeDataTime;

    @NotBlank
    private String stockName;

    @NotNull
    private int listingPrice;

    @NotNull
    private int quantity;

    @NotBlank
    private String type;

    @NotNull
    private int pricePerUnit;


    public Long getId() {
        return id;
    }

   
    public Date getTradeDataTime() {
        return tradeDataTime;
    }

    public void setTradeDataTime(Date tradeDataTime) {
        this.tradeDataTime = tradeDataTime;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public int getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(int listingPrice) {
        this.listingPrice=listingPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity=quantity;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type=type;
    }

    public int getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(int pricePerUnit) {
        this.pricePerUnit=pricePerUnit;
    }

}
