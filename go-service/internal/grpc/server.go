package grpc

import (
	"context"
	"fmt"
	pb "go-service/proto"
)

type EventServer struct {
	pb.UnimplementedEventProcessorServer
}

func (s *EventServer) ProcessEvent(ctx context.Context, req *pb.EventRequest) (*pb.EventResponse, error) {
	fmt.Println("Evento recebido via gRPC:")
	fmt.Printf("UserID: %s\nTipo: %s\nMetadata: %s\n", req.UserId, req.Type, req.Metadata)
	return &pb.EventResponse{
		Success: true,
		Message: "Evento processado com sucesso",
	}, nil
}
