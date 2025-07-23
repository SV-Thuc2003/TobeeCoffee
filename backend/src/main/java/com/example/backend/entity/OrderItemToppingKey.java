package com.example.backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;


@Embeddable
public class OrderItemToppingKey implements Serializable {
    @Column(name = "order_item_id")
    private Integer orderItemId;

    @Column(name = "topping_id")
    private Integer toppingId;
}
