package com.example.tradingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.tradingApp.exception.ResourceNotFoundException;
import com.example.tradingApp.model.Orders;
import com.example.tradingApp.model.TradingDetails;
import com.example.tradingApp.repository.OrdersRepository;
import com.example.tradingApp.repository.TradingDetailsRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TradingDetailsController {

    @Autowired
    TradingDetailsRepository tradingDetailsRepository;

    @Autowired
    OrdersRepository ordersRepository;

    @GetMapping("/tradingdetails")
    public List<TradingDetails> getAllTrades() {
        return tradingDetailsRepository.findAll();
    }

    @PostMapping("/tradingdetails")
    public TradingDetails createTrade(@Valid @RequestBody TradingDetails tradingDetails) {
        return tradingDetailsRepository.save(tradingDetails);
    }

    @GetMapping("/tradingdetails/{id}")
    public TradingDetails getTradeById(@PathVariable(value = "id") Long id) {
        return tradingDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TradindDetails", "id", id));
    }

    @PutMapping("/tradingdetails/{id}")
    public TradingDetails updateTrade(@PathVariable(value = "id") Long id,
            @Valid @RequestBody TradingDetails tradeDetails) {

        TradingDetails tradingDetails = tradingDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", id));

        tradingDetails.setStockName(tradeDetails.getStockName());
        tradingDetails.setListingPrice(tradeDetails.getListingPrice());
        tradingDetails.setQuantity(tradeDetails.getQuantity());
        tradingDetails.setType(tradeDetails.getType());
        tradingDetails.setPricePerUnit(tradeDetails.getPricePerUnit());

        TradingDetails updatedNote = tradingDetailsRepository.save(tradingDetails);
        return updatedNote;
    }

    @DeleteMapping("/tradingdetails/{id}")
    public ResponseEntity<?> deleteTrade(@PathVariable(value = "id") Long id) {
        TradingDetails tradindDetails = tradingDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TradeDetails", "id", id));

        tradingDetailsRepository.delete(tradindDetails);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/orderdetails/{id}")
    public Orders createOrder(@PathVariable(value = "id") Long id) {
        TradingDetails tradingDetails = tradingDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TradindDetails", "id", id));
        Orders orders = new Orders();
        orders.setQuantity(tradingDetails.getQuantity());
        orders.setPricePerUnit(tradingDetails.getPricePerUnit());
        orders.setType(tradingDetails.getType());
        orders.setStockName(tradingDetails.getStockName());
        orders.setStatus("created");
        return ordersRepository.save(orders);
    }

    @GetMapping("/orderdetails")
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }
}
