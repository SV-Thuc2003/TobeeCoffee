package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_item_toppings")
@Data
public class OrderItemTopping {
    @EmbeddedId
    private OrderItemToppingKey id = new OrderItemToppingKey();

    @ManyToOne
    @MapsId("orderItemId")
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;

    @ManyToOne
    @MapsId("toppingId")
    @JoinColumn(name = "topping_id")
    private Topping topping;
}
